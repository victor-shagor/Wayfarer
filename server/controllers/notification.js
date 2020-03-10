import pool from "../config";
import jwt from 'jsonwebtoken'

const notifyUser = async (req, res) => {
  const { id } = req.params;
  let messageCount;
  let messageBody;
  const results = await pool.query(
    "SELECT * FROM messages WHERE user_id =$1 AND is_read=$2",
    [id, false]
  );
  messageBody = results.rows
  messageCount = messageBody.length;
  // const notify = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //       <title>Barefoot Nomad</title>
  //       <script src="/socket.io/socket.io.js"></script>
  //     </head>
  //     <body>
  //       <h1>Barefoot Nomad</h1>
  //       <h2 id="messageCount"></h2>
  //       <div id="message-container">
  //       </div>
  //       <a href="" id='all-messages'>Link</a>
  //       <script>
  //         const socket = io();
  //         let countMessage = ${messageCount};
  //         const messageCount = messageCount => {
  //           const message = document.getElementById('messageCount');
  //           message.textContent = 'Messages:' + messageCount;
  //         };
  //         const messageDisplay = (message) => {
  //           const div = document.getElementById('message-container');
  //           let paragraph = document.createElement('p');
  //           paragraph.appendChild(document.createTextNode(message));
  //           div.appendChild(paragraph);
  //         };
  //         messageCount(${messageCount});

  //         socket.on(${id}, data => {
  //           messageDisplay(data)
  //           countMessage += 1;
  //           messageCount(countMessage);
  //         });
  //       </script>
  //     </body>
  //   </html>
  // `;
  return res.json({ data: { messageBody, messageCount } });
};

export const read = async (req, res) => {
  const { id } = req.params;
  const decoded = jwt.decode(req.headers.token, { complete: true });
  const results = await pool.query(
    "UPDATE messages SET is_read=$1 WHERE user_id =$2 AND id=$3",
    [true, decoded.payload.user_id, id]
  );
  return res.json({ message: 'Notification deleted succesfully'});
};

export default notifyUser;
