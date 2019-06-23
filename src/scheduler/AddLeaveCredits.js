const AddLeaveCredits = async (db) => {
  try {

    console.log("Adding leave credits to all...");

    await db.collection('leaveCredit').updateMany(
      {},
      { $inc: { credit: 2 } },
      { upsert: true }
    )

  } catch (error) {
    console.error("AddLeaveCredits -> An error occured.")
  }
}

export default AddLeaveCredits;
