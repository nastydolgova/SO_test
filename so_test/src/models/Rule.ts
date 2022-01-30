export class Rule {
    id: number = 0
    parentId: null | number = 0
    name: string = ''
    checked: boolean = false
    children: Rule[] | null = null;
}