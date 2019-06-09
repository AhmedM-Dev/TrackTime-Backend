const removeHoliday = ({ db, params }, res) => {

  if (params && Object.keys(params).length > 0) {
    try {
      const result = await db.collection('holidays').deleteOne();

      return res.status(200).json({
        result
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
};

export default removeHoliday;