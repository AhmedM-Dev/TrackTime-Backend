const updateEvent = async ({ db, body, params }, res) => {
  console.log('updating:', params);
  try {
    const updatedEvent = await db.collection('events').updateOne(
      { eventId: params.eventId },
      { $set: { ...body } },
      { returnNewDocument: true }
    );

    await db.collection("notifications").insertOne({
      notifId: uuid(),
      title: `The event '${eventToDelete.title}' has been updated.`,
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

  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

export default updateEvent;