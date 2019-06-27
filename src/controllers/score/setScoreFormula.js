import uuid from 'uuid/v4';

const setFormulaScore = async ({ db, body }, res) => {

  if (body && Object.keys(body).length > 0) {

    try {
      const formula = await db.collection('config').insertOne({
        configId: uuid(),
        ...body
      });

      return res.status(200).json({ formula });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default setFormulaScore;