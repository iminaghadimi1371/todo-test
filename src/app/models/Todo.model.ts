export class TodoModel {
  title: string;
  isCompleted?: boolean = false;

  constructor(item: { title: string, isCompleted?: boolean }) {
    this.title = item.title;
    this.isCompleted = item.isCompleted || false;
  }

}
