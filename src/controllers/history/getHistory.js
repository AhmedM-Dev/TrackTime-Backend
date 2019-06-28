import moment from 'moment';
import { toLower } from 'lodash';

const getHistory = async ({ db, user, query }, res) => {

  const { year, status, category } = query;

  try {
    let requests = await db.collection('requests').find({ requestCategory: 'LEAVE', fromUser: user.userId }).toArray();
    // let leaves = await db.collection('leaves').find({ userId: user.userId });
    // const travels = await db.collection('travels').find({ userId: user.userId });
    // const authorizations = await db.collection('authorizations').find({ userId: user.userId });

    // leaves = dateFrom ? leaves.filter(item => )

    requests = year ? requests.filter(item => moment(item.dateFrom).format('YYYY') === year || moment(item.dateTo).format('YYYY') === year) : requests;
    requests = status ? requests.filter(item => item.status === status) : requests;
    requests = category ? requests.filter(item => toLower(item.leaveCategory) === toLower(category)) : requests;

    return res.status(200).json({
      history: requests
    });

  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default getHistory;
