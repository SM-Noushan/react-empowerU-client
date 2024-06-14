import moment from "moment";

const parseScholarshipDetailsData = (data) => {
  const parsedData = {
    ...data,
    applicationFee: parseFloat(data.applicationFee),
    serviceCharge: parseFloat(data.serviceCharge),
    universityWorldRank: parseInt(data.universityWorldRank),
    applicationDeadline: moment(data.applicationDeadline).format("DD MMMM, YYYY"),
  };
  return parsedData;
};

export default parseScholarshipDetailsData;
