const deleteEvent = async ({ db, params }, res) => {

  try {
    const eventToDelete = await db.collection('events').findOne({ eventId: params.eventId });
    await db.collection('events').deleteOne({ eventId: params.eventId });

    await db.collection("notifications").insertOne({
      notifId: uuid(),
      title: `The event '${eventToDelete.title}' has been canceled.`,
      content: `The event '${eventToDelete.title}' has been canceled.`,
      category: 'INFO',
      public: true,
      vues: [],
      createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
      createdAtTimestamp: moment().unix()
    });

    return res.status(200).json({
      event: params.eventId
    });

  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

export default deleteEvent;