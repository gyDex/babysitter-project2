export class Order {
  id: string; // UUID
  userId: string;
  amount: string;
  status: 'pending' | 'paid' | 'failed';
}
