const consult = require("../modals/ConsultReq");

const getConsultReq = async (req, res) => {
    try {
        const consultData = await consult.find();
        return res.status(200).json(consultData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const sendConsultReq = async (req, res) => {
    try {
        const { name, phone, help } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone are required" });
        }

        const consultReq = new consult({
            name,
            phone,
            help
        });

        await consultReq.save();
        return res.status(201).json({ message: "Consultation request sent successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getConsultReq, sendConsultReq};