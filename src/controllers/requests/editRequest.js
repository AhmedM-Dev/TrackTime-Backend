const editRequest = async ({ db, body, params }, res) => {
  console.log('[EDIT REQUEST]:', body !== {}, );

  if (body && Object.keys(body).length > 0) {
    try {

      const request = await db.collection('requests').findOneAndUpdate({ requestId: params.requestId }, {
        $set: { ...body }
      }, { returnNewDocument: true });

      return request ? res.status(200).json({ request: request.value }) : res.status(400).json({ error: 'No data available.' });

    } catch (error) {
      return res.status(500).json({ error });
    }
  } 
  
  if (!body || Object.keys(body).length === 0) {
    return res.status(500).json({ error: 'Empty request body.' });
  }
};

export default editRequest;