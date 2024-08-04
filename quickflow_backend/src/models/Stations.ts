import { pb } from "../pocketbase";
import { Railways } from "./Railways";

export class Stations {
    id?: string;
    railway: Railways;
    name: string;

    constructor(railway: Railways, name: string) {
        this.railway = railway;
        this.name = name;
    }

    static async fetchAll(): Promise<Stations[]> {
        const records = await pb.collection("stations").getFullList();
        return records.map(
            (record) => new Stations(new Railways(record.railway), record.name)
        );
    }

    async save() {
        const record = await pb.collection("stations").create({
            railway: this.railway.id,
            name: this.name,
        });
        this.id = record.id;
    }
}
