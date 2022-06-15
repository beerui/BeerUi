import { MessageBox } from './beerui';
/**
 * MessageBox 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 */
let messageBox = null;
export default messageBox = (options): MessageBox => new MessageBox(options);
