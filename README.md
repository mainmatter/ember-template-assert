# ember-template-assert

Small addon that makes Ember's assert utility available as a template helper. Completely removed from production builds.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```
ember install ember-template-assert
```


## Usage

Usage is identical to the `assert` utility provided by Ember. See: https://api.emberjs.com/ember/release/functions/@ember%2Fdebug/assert for comprehensive documentation.

```
// template.hbs
{{assert "myVariable needs to be truthy" this.myVariable}}
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
