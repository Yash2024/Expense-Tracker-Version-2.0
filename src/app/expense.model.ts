export interface expense
{
    _id: string;
    date: string;
    name: string;
    desc: string;
    amount: number ;
    btn: boolean;
    userId: string | null;
}