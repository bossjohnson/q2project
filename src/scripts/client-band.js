click(".panel-side", e => {
  if(e.target.classList.contains("remove")) removeMember(e.target);
  if(e.target.classList.contains("add-gig")) addGig(e.target);
  if(e.target.classList.contains("submit-gig")) submitGig(e.target);
  if(e.target.classList.contains("cancel-gig")) cancelGig(e.target);
});

click(".panel", e => {
  if(e.target.classList.contains("gig-edit-cancel")) gigEdit(e.target);
  if(e.target.classList.contains("gig-edit-edit")) gigEdit(e.target);
  if(e.target.classList.contains("gig-song") && el("#isAdmin")) openSong(e.target);
});

function gigEdit(e){
  el(".gig-edit")[0].classList.toggle("open");
}

function openSong(e){
  var songinfo = el(".song-info", e.parentNode)[0],
    songinputs = el(".song-inputs", e.parentNode)[0];
  if(e.parentNode.classList.contains("open")){
    [".song-key", ".time-signature", ".feel", ".tempo"].forEach(c => {
      el(c, songinfo)[0].textContent = el(c, songinputs)[0].value;
    });
  }
  el(".song-info", e.parentNode)[0].classList.toggle("hide");
  el(".song-inputs", e.parentNode)[0].classList.toggle("show");
  e.parentNode.classList.toggle("open");
}

function removeMember(e){
  var parent = e.parentNode,
    grandparent = parent.parentNode,
    ancestor = grandparent.parentNode;
  ancestor.removeChild(grandparent);
}

function addGig(e){
  e.parentNode.classList.toggle("open");
}

function submitGig(e){
  var parent = e.parentNode,
    grandparent = parent.parentNode,
    gigTitle = el(".new-gig")[0].value;
  if(!gigTitle.length) return;
  grandparent.insertBefore(newGig(gigTitle), parent.nextSibling);
  console.log(e.parentNode);
  e.parentNode.classList.remove("open");
}

function newGig(title){
  return t("label", {"for": "new-gig", classes: ["title"]})([
    t("div")(),
    t("div")(title)
  ]);
}

function cancelGig(e){
  el("input", e.parentNode)[0].value = "";
  e.parentNode.classList.remove("open");
}

click(".call", call);

function call(){
  http("get", "/users/call");
  console.log("call");
}
