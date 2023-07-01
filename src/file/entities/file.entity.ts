import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'tbl_files'})
export class File extends Model {

    @Column
    title: string;

    @Column
    alt: string;

    @Column
    fileType: string;
    
    @Column
    originalname: string;
    
    @Column
    fileName: string;
    
    @Column
    web_url: string;
    
    @Column
    serverPath: string;

    @Column
    category: string;

    @Column
    fileCode: string; // NORMAL, GALLERY
}

export const FileRepo = {
    provide: "FILE_REPO",
    useValue: File,
    global: true
}