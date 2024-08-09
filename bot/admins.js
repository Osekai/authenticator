var admins = ["233170527458426880", "380041492267270144"]
function IsAdmin(id) {
    return admins.includes(id);
}
module.exports = IsAdmin;