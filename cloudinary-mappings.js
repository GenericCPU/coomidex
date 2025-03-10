// Cloudinary image mappings
const cloudinaryMappings = {
  "small": {
    "160.jpg": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616481/coomidex/small/ks2mm5chvvgaaav33qn7.jpg",
    "158.webp": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616481/coomidex/small/oqffdycuasanhrwo3rxf.webp",
    "160.webp": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616481/coomidex/small/vhsjozr2foavy6faohsj.webp",
    "159.webp": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616482/coomidex/small/u6im7pbzffszhsx77lez.webp",
    "159.jpg": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616482/coomidex/small/ot7nc6nqkxokeuscfdzq.jpg",
    "158.jpg": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616484/coomidex/small/c4zkohnpwyd9ilaucfew.jpg",
    "158.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616485/coomidex/small/fpml7iju7sn1zgvw2thv.png",
    "159.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616485/coomidex/small/gsidwpe7dp8gehe6685r.png",
    "160.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616485/coomidex/small/ctjh7zdboitruh495jru.png"
  },
  "card": {
    "159.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616493/coomidex/card/isy1y8q3gowomhayukir.png",
    "158.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616493/coomidex/card/x6cusz7iex7rjqpcfnoy.png",
    "160.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616495/coomidex/card/ff8ein7zmwvqxsmq9p4p.png"
  },
  "ability": {
    ".DS_Store": "https://res.cloudinary.com/dvort0mgm/raw/upload/v1741616496/coomidex/ability/mncbtmggyimtwalzucdt.DS_Store",
    "Afterlife.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616496/coomidex/ability/r7lkalokqfsgtctgh5uy.png",
    "Aegis.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616496/coomidex/ability/dl8svd7il1rhelpagcqh.png",
    "0_Frame.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616496/coomidex/ability/v0w9jxmt6z5zklsseoad.png"
  },
  "element": {
    "Air_1.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616497/coomidex/element/livdxt1xgbpzdexyc7sq.png",
    "Dark_1.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616497/coomidex/element/qc0yilg6twxrikwzv18m.png",
    "Dark.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616500/coomidex/element/dsiqx6vkx0piulxthnqt.png",
    "Air_2.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616500/coomidex/element/aovxritvlkovaltghwea.png",
    "Air.png": "https://res.cloudinary.com/dvort0mgm/image/upload/v1741616500/coomidex/element/f12fvawug6qe7ybdn1ew.png"
  }
};

// Function to get image URL
function getImageUrl(type, filename) {
  return cloudinaryMappings[type][filename] || `${type} pics/${filename}`;
}

// Export for use in other files
window.getImageUrl = getImageUrl;
