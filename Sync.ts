import { UserData } from "./User.ts";

export default class Sync {
  constructor(public rootUrl: string) {
  }

  public async retrieve(id: number): Promise<UserData> {
    const res = await fetch(`${this.rootUrl}/${id}`);
    const data = await res.json();
    return data;
  }

  public async save(data: UserData): Promise<Response> {
    const { id } = data;

    if (id) {
      const update = await fetch(`{this.rootUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return update;
    } else {
      const post = await fetch(this.rootUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return post;
    }
  }
}
