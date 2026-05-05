export interface Message {}

export interface Email {
  send: (message: Message) => Promise<boolean>
}
