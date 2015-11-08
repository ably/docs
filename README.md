Ably Documentation Overview
===========================

[Ably](https://www.ably.io) is a hugely scalable, superfast and secure hosted realtime messaging service for web-enabled devices.

This Git repository contains most of the [Ably API documentation](https://www.ably.io/documentation) that resides at <https://www.ably.io/documentation> in [Textile](redcloth.org/textile) format.  [Nanoc](http://nanoc.stoneship.org/) is used to build the static site from the `source` branch.

The Ably documentation was intentionally created as a public repository using a simple text based markup language so that:

* It can be maintained by Ably staff and developers.
* 3rd parties can fork the repository, and submit pull requests to improve the documentation.  We welcome the community's suggestions and input.
* This documentation is later merged upstream to the [Ably primary website documentation](https://www.ably.io/documentation) with each website releas.

Viewing the documentation
------

The static site generated from this documentation repository is hosted at <http://docs.ably.io>.  We frequently publish updates from this repository so is typically more up to date than the [official Ably API documentation](https://www.ably.io/documentation).

The official complete Ably documentation that incoporates all the documentation in this repository can be found at <https://www.ably.io/documentation>

Forking and running locally
------

* Fork the repository at https://github.com/ably/docs
* Clone a local version of your forked repo `git clone https://github.com/[you]/docs` and `cd` into it
* Checkout the source branch: `git checkout source`
* Create your feature or fix branch and check it out: `git checkout -b [your-branch]`
* `bundle install` to install the necessary gems
* Create a jsbin config file: `cp config/jsbin_config.example.yaml config/jsbin_config.yaml`
* `nanoc` to generate the site for the first time
* `nanoc view -p 4000` to start up a web server at <http://localhost:4000>
* `bundle exec guard` to watch for changes and rebuild the site automatically
* Make your changes and they should be visible within seconds in the browser following a refresh.  If the changes are not visible, check your console where `guard` is running for errors.
* Commit your changes, push your branch and send us a pull request

Help and contact
----

If you have any questions or suggestions, please [get in touch with us at Ably](https://www.ably.io/contact)
