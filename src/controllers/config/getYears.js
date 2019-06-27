const getYears = async ({ db }, res) => {
  try {
    const years = await db.collection('config').findOne({ _id: 'YEARS' });

    return res.status(200).json({ years });

  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default getYears;