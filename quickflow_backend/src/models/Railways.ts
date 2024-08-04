import { pb } from "../pocketbase";

export class Railways {
    id?: string;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    static async fetchAll(): Promise<Railways[]> {
        const records = await pb.collection("railways").getFullList();
        return records.map((record) => new Railways(record.name));
    }

    async save() {
        const record = await pb
            .collection("railways")
            .create({ name: this.name });
        this.id = record.id;
    }
}
