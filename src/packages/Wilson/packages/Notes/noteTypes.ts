export interface NoteType {
    id: number
    title: string
    content: string
    created: string
    modified: string
    author: string
}

export interface NotesComponentsInterface {
    notes: JSX.Element;
    note: JSX.Element
}