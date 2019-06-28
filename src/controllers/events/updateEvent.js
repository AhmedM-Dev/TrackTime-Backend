import moment from 'moment';
import uuid from 'uuid/v4';

const updateEvent = async ({ db, body, params }, res) => {
  console.log('updating:', params);

    const { _id, ...bodyContent } = body;

    await db.collection('events').updateOne(
      { eventId: params.eventId },
      { $set: { ...bodyContent } },
      { returnNewDocument: true }
    );

    const updatedEvent = await db.collection('events').findOne({ eventId: params.eventId });

    await db.collection("notifications").insertOne({
      notifId: uuid(),
      title: `The event '${updatedEvent.title}' has been updated.`,
      content: updatedEvent.details,
      category: 'EVENT',
      public: true,
      vues: [],
      createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
      createdAtTimestamp: moment().unix()
    });

    return res.status(200).json({
      event: updatedEvent
    });


};

export default updateEvent;