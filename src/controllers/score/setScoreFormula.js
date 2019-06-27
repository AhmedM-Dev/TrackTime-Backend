import uuid from 'uuid/v4';

const setFormulaScore = async ({ db, body }, res) => {

  if (body && Object.keys(body).length > 0) {

    try {
      const formula = await db.collection('config').findOneAndUpdate(
        { _id: 'FORMULA' },
        {
          $set: {
            _id: 'FORMULA',
            ...body
          }
        },
        { upsert: true, returnNewDocument: true }
      );

      if (formula.value) {
        return res.status(200).json({
          photo: formula.value
        });
      } else {
        const formula = await db.collection('config').findOne({ _id: 'FORMULA' });

        return res.status(200).json({
          formula
        });
      }

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default setFormulaScore;