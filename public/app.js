const fallbackInvite = "#";
const inviteEls = ["navInvite", "heroInvite", "bottomInvite"];

async function loadCommunity() {
  try {
    const response = await fetch("/api/community");
    const data = await response.json();
    inviteEls.forEach((id) => {
      const link = document.getElementById(id);
      if (link) link.href = data.inviteUrl || fallbackInvite;
    });

    const count = document.getElementById("memberCount");
    const dot = document.getElementById("statusDot");
    const status = document.getElementById("statusText");

    if (data.memberCount !== null && data.memberCount !== undefined) {
      count.textContent = Number(data.memberCount).toLocaleString();
    } else {
      count.textContent = "—";
    }

    if (data.connected) {
      dot.classList.add("online");
      status.textContent = "Connected";
    } else {
      status.textContent = "Demo mode";
    }
  } catch (error) {
    document.getElementById("statusText").textContent = "Unavailable";
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
loadCommunity();
