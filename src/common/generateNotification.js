import uuid from 'uuid/v4';

const generateNotification = (db, core, entity) => {
  db.collection('notifications').insertOne({
    notifId: uuid(),
    title: core.title,
    content: core.content,
    category: core.category,
    entity,
    targetUsers: core.targetUsers,
    vues: []
  }, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else if (result) {
      return res.status(200).json({
        message: "Notification generated."
      });
    }
  });
}

export default generateNotification;