# redux-persist-realm

Redux persist support for Realm database by using key/value approach

## Installation

### Prerequisites

- [`redux-persist`](https://github.com/rt2zz/redux-persist) v4, v5
- [`realm`](https://realm.io/docs/javascript/latest/#getting-started)

```bash
yarn add @bankify/redux-persist-realm
```

### Usage

```javascript
import { persistStore } from "redux-persist";
import { createRealmPersistStorage } from "@bankify/redux-persist-realm";

const persistor = persistStore(store, { storage: createRealmPersistStorage() });
```

## Contributing

Pull requests are welcomed!

## Todo-list

- [ ] Support for customized schema
- [ ] Support for batch update

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bankifyio/redux-persist-realm/tags).

## Authors

- **Luong Dang Hai** - [@jarvisluong](https://github.com/jarvisluong)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
