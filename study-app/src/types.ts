export interface Subject {
    id: string;
    name: string;
}

export interface Unit {
    id: string;
    subjectId: string;
    name: string;
}

export interface Topic {
    id: string;
    unitId: string;
    name: string;
}

export interface Node {
    id: string;
    topicId: string;
    parentId: string | null;
    label: string;
    content: string;
    contentMode: 'inline' | 'block';
    order: number;
}
