const functions = require("firebase-functions");
const Filter = require("bad-words");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { message, uid } = doc.data();

    if (filter.isProfane(message)) {
      await doc.ref.update({
        message: `I got BANNED for being naughty.`,
      });

      await db.collection("banned").doc(uid).set({});
    }
  });
