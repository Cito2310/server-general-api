import {
    Document,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    LevelFormat,
    convertInchesToTwip,
} from 'docx';
import type { Subject, Unit, Topic, Node } from '../../types';

const INDENT_PER_LEVEL = convertInchesToTwip(0.35);

const buildNodeParagraphs = (
    topicNodes: Node[],
    parentId: string | null,
    depth: number
): Paragraph[] => {
    const children = topicNodes
        .filter(n => n.parentId === parentId)
        .sort((a, b) => a.order - b.order);

    const paragraphs: Paragraph[] = [];

    for (const node of children) {
        const indent = { left: depth * INDENT_PER_LEVEL };

        if (node.contentMode === 'inline' && node.content) {
            paragraphs.push(
                new Paragraph({
                    indent,
                    children: [
                        new TextRun({ text: `${node.label}`, bold: true }),
                        new TextRun({ text: ` → ${node.content}` }),
                    ],
                })
            );
        } else {
            paragraphs.push(
                new Paragraph({
                    indent,
                    children: [new TextRun({ text: node.label, bold: true })],
                })
            );

            if (node.content) {
                paragraphs.push(
                    new Paragraph({
                        indent: { left: (depth + 1) * INDENT_PER_LEVEL },
                        children: [new TextRun({ text: node.content, italics: true })],
                    })
                );
            }
        }

        paragraphs.push(...buildNodeParagraphs(topicNodes, node.id, depth + 1));
    }

    return paragraphs;
};

export const buildWordDocument = (
    subject: Subject,
    unit: Unit,
    topics: Topic[],
    allNodes: Node[]
): Document => {
    const children: Paragraph[] = [
        new Paragraph({
            text: `${subject.name} — ${unit.name}`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: '' }),
    ];

    for (const topic of topics) {
        children.push(
            new Paragraph({
                text: topic.name,
                heading: HeadingLevel.HEADING_2,
            })
        );

        const topicNodes = allNodes.filter(n => n.topicId === topic.id);
        const nodeParagraphs = buildNodeParagraphs(topicNodes, null, 1);

        if (nodeParagraphs.length === 0) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: 'Sin nodos.', color: '999999', italics: true })],
                    indent: { left: INDENT_PER_LEVEL },
                })
            );
        } else {
            children.push(...nodeParagraphs);
        }

        children.push(new Paragraph({ text: '' }));
    }

    return new Document({
        numbering: {
            config: [{
                reference: 'default-numbering',
                levels: [{
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: '•',
                    alignment: AlignmentType.LEFT,
                }],
            }],
        },
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: convertInchesToTwip(0.3),
                        bottom: convertInchesToTwip(0.3),
                        left: convertInchesToTwip(0.3),
                        right: convertInchesToTwip(0.3),
                    },
                },
            },
            children,
        }],
    });
};
