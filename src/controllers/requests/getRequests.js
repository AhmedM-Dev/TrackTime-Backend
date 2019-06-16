const getRequests = async ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);

  const userId = query.userId || user.userId;
  const { status } = query;

  try {

    let requests = await db.collection("requests").find({ fromUser: userId }).toArray();

    requests = status ? requests.filter(request => request.status === status) : requests;

    return res.status(200).json({ requests });

  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

export default getRequests;
