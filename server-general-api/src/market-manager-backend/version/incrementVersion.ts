import { MMVersion } from "./version.model";

type VersionField = "productVersion" | "categoryVersion" | "imageVersion" | "userVersion" | "dailySummaryVersion";

export const incrementVersion = (field: VersionField) => {
    return MMVersion.findOneAndUpdate({}, { $inc: { [field]: 1 } }, { upsert: true });
};
