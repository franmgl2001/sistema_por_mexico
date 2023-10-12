
const priorityChart = async (request, response, db, jwt) => {
    try {
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        const data = await db.collection('tickets').find(parametersFind).toArray();
        let dataPriority = {}
        // FIll dataPriority

        dataPriority["Baja"] = 0
        dataPriority["Media"] = 0
        dataPriority["Alta"] = 0

        data.forEach(element => {
            if (element.Prioridad in dataPriority) {
                dataPriority[element.Prioridad] += 1
            }
        }
        );
        response.json(dataPriority);
    } catch {
        response.sendStatus(401);
    }
}

const classroomChart = async (request, response, db, jwt) => {

    const token = request.get("Authentication");
    const verifiedToken = await jwt.verify(token, "secretKey");
    const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
    let parametersFind = {}
    const collection = request.params.collection;
    if (authData.permissions == "Coordinador") {
        parametersFind["user"] = verifiedToken.user;
    }

    // FIll dataClassroom
    const data = await db.collection('tickets').find(parametersFind).toArray();
    const collectionData = await db.collection(collection).find().toArray();
    let dataClassroom = {}
    dataClassroom = orderClassroomData(data, collection, collectionData)
    response.json(dataClassroom);

}


const orderClassroomData = (data, collection, collectionData) => {
    let dataClassroom = {}
    let labels = []
    let datasets = {}
    data.forEach(ticket => {
        // Check if ticket[Aula] is in labels
        if (!labels.includes(ticket.Aula)) {
            labels.push(ticket.Aula)
        }
    });
    // Fill datasets
    collectionData.forEach(element => {

        datasets[element["name"]] = []
        labels.forEach(label => {
            datasets[element["name"]].push(0)
        });
    });

    data.forEach(ticket => {
        datasets[ticket[collection]][labels.indexOf(ticket.Aula)] += 1
    });

    dataClassroom["labels"] = labels
    dataClassroom["datasets"] = datasets

    return dataClassroom
}

module.exports = {
    priorityChart,
    classroomChart
};