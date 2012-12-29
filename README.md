Ably Documentation Overview
===========================

[Ably](https://ably.io) is a hugely scalable, superfast and secure hosted real-time messaging service for web-enabled devices.

This repository contains contains most of the [Ably API documentation](https://ably.io/documentation) that resides at <https://ably.io/documentation> in [Textile](redcloth.org/textile) format.  [Nanoc](http://nanoc.stoneship.org/) is used to build the static site from the `source` branch.

The Ably documentation was intentionally created as a public repository using a simple text based markup language so that:

* It can be maintained easily by the Ably core developers.
* 3rd parties can fork the repository easy, and easily submit pull requests to improve the documentation.  We welcome the community's suggestions and input.
* This documentation is merged into the [Ably primary website documentation](https://ably.io/documentation) with each release, however this documentation repo can be easily maintained and is thus kept up to date in near real-time.

Viewing the documentation
------

The static site generated from this repository is hosted at <http://ably.github.com> - this version is typically most up to date.

Complete documentation, including this repository's documentation can be found at <https://ably.io/documentation>

Forking and running locally
------

* Fork the repository at https://github.com/ably/ably.github.com
* Clone a local version of the repo and `cd` into it
* Create a new branch for your changes
* `git checkout source`
* `rake serve` to start up a web server at <http://localhost:4000>
* `rake watch` to watch for changes and rebuild the site
* Make any changes you wish to make and they should be reflected immediately.  If they are not, check your console where `rake watch` is running for errors.
* Commit your changes, push your branch and send us a pull request

Help and contact
----

If you have any questions or suggestions, please [get in touch with us at Ably](https://ably.io/contact)