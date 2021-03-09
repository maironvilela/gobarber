import IMailProvider from "../models/IMailProvider";

interface IMessage {
  to: string,
  body: string
}

class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    console.log('Email enviado para: ' + to)
    this.messages.push({ to, body })
  }

}

export default FakeMailProvider;
