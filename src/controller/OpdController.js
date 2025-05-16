const OPDCamps = require("../modals/OPDCamps");

// Fetch next 4 upcoming OPD camps
const getNextFourOPDCamps = async (req, res) => {
    try {
        const today = new Date();
        const opdCamps = await OPDCamps.find({ date: { $gte: today } })
            .sort({ date: 1 })
            .limit(4);

        return res.status(200).json(opdCamps);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getNextOPDCamps = async (req, res) => {
    try {
        const today = new Date();
        const opdCamps = await OPDCamps.find({ date: { $gte: today } })
            .sort({ date: 1 })

        return res.status(200).json(opdCamps);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllTodaysOPDCamps = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const opdCamps = await OPDCamps.find({
      date: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }).sort({ date: 1 });

    return res.status(200).json(opdCamps);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Fetch the most upcoming OPD camp (next one)
const getMostUpcomingOPDCamp = async (req, res) => {
    try {
        const today = new Date();
        const nextCamp = await OPDCamps.findOne({ date: { $gte: today } })
            .sort({ date: 1 });

        if (!nextCamp) {
            return res.status(404).json({ message: "No upcoming camp found" });
        }

        return res.status(200).json(nextCamp);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addNextOPDCamps = async (req, res) => {
  try {
    const { title, location, date, time } = req.body;
    const image = req.file?.filename;

    if (!image || !title || !location || !date || !time) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const newCamp = new OPDCamps({
      image,
      title,
      location,
      date,
      time,
    });

    await newCamp.save();
    return res.status(201).json(newCamp);
  } catch (error) {
    console.error("Error adding OPD Camp:", error);
    return res.status(500).json({ error: error.message });
  }
};

// to fetch 4 previous camps
const getFourPreviousOPDCamps = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const previousCamps = await OPDCamps.find({ date: { $lt: today } })
            .sort({ date: -1 })
            .limit(4);

        return res.status(200).json(previousCamps);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getAllPreviousOPDCamps = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const previousCamps = await OPDCamps.find({ date: { $lt: today } })
            .sort({ date: -1 })

        return res.status(200).json(previousCamps);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {getAllPreviousOPDCamps, getNextFourOPDCamps, getMostUpcomingOPDCamp, addNextOPDCamps, getFourPreviousOPDCamps, getAllTodaysOPDCamps, getNextOPDCamps};
