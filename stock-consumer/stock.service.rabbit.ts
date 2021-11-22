const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0: any, connection: { createChannel: (arg0: (error1: any, channel: any) => void) => void; }) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1: any, channel: {
    assertExchange: (arg0: string, arg1: string, arg2: {
      durable: boolean; }) => void; assertQueue: (arg0: string, arg1: {
        exclusive: boolean;
      }, arg2: (error2: any, q: any) => void) => void;
      bindQueue: (arg0: any, arg1: string, arg2: string) =>
      void; consume: (arg0: any, arg1: (msg: {
        content: {
          toString: () => any;
        }; }) => void, arg2: { noAck: boolean;
        }) => void;
      }
  ) {
    if (error1) {
      throw error1;
    }
    const exchange = 'stock';

    channel.assertExchange(exchange, 'direct', {
      durable: true,
    });

    channel.assertQueue('', {
      exclusive: true,
    }, function(error2: any, q: { queue: any; }) {
      if (error2) {
        throw error2;
      }
      // eslint-disable-next-line max-len
      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg: {
        content: { toString: () => any; };
      }) {
        if (msg.content) {
          console.log(' [x] %s', msg.content.toString());
        }
      }, {
        noAck: true,
      });
    });
  });
});
export default amqp;

