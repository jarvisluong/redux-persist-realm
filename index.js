import Realm from "realm";

const ITEM_SCHEMA = {
  name: "ReduxPersistItem",
  primaryKey: "name",
  properties: {
    name: "string",
    content: "string"
  }
};

// Wrap function to support both Promise and callback
// Copied from repo https://github.com/Nohac/redux-persist-expo-fs-storage/blob/master/index.js
async function withCallback(callback, func) {
  try {
    const result = await func();
    if (callback) {
      callback(null, result);
    }
    return result;
  } catch (err) {
    if (callback) {
      callback(err);
    } else {
      throw err;
    }
  }
}

function createRealmAccess({ path, encryptionKey } = { path: Realm.defaultPath }) {
  let __realm = null;
  return async function accessRealm() {
    if (!__realm) {
      try {
        __realm = await Realm.open({
          schema: [ITEM_SCHEMA],
          path,
          encryptionKey,
        });
      } catch (error) {
        throw error;
      }
    }
    return __realm;
  };
}

export function createRealmPersistStorage(realmConfig) {
  const accessRealm = createRealmAccess(realmConfig);

  async function accessItemInstances() {
    const realm = await accessRealm();
    return realm.objects(ITEM_SCHEMA.name);
  }

  async function getItem(key, callback) {
    return withCallback(callback, async function() {
      const items = await accessItemInstances();
      const matches = items.filtered(`name = "${key}"`);
      if (matches.length > 0 && matches[0]) {
        return matches[0].content;
      } else {
        throw new Error(`Could not get item with key: '${key}'`);
      }
    });
  }

  async function setItem(key, value, callback) {
    return withCallback(callback, async function() {
      const realm = await accessRealm();
      realm.write(() => {
        realm.create(
          ITEM_SCHEMA.name,
          {
            name: key,
            content: value
          },
          true
        );
      });
    });
  }

  async function removeItem(key, callback) {
    return withCallback(callback, async function() {
      const realm = await accessRealm();
      const items = await accessItemInstances();
      realm.write(() => {
        const item = items.filtered(`name = "${key}"`);
        realm.delete(item);
      });
    });
  }

  return {
    getItem,
    setItem,
    removeItem
  };
}
