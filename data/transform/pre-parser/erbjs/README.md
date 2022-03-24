# ERB in JS

This is a section of the app that manages a very limited subset of ERB functionality.

The ERB-JS folder will not transpile Ruby code or render arbitrary code.

It recognises & works with only very specific strings:

1. ```<%= JsBins.url_for('${quote}') %>```
2. ```<%= Ably::DOCUMENTATION_LANGUAGES.map { |lang_id, lang| "@#{lang_id}@" }.join(', ') %>```
3. ```<% @items.select { |d| d[:section] == '${design-patterns|tutorials}' }.sort_by { |d| d[:title] }.each do |item| %>\n"<%= html_escape(item[:title]) %>":<%= html_escape(item.path) %><% end %>```
4. ```<% ['👦', ${...emojis}].each do |emoji| %><label><input type="radio" name="avatar" value="<%= emoji %>" /><span class="emoji"><%= emoji %></span></label><% end %>```

## Alternatives

If a need comes up for proper ERB support in the future, here are some options that were considered but caused too many delays in the initial implementation:

1. Parsing out tokens and registering JavaScript functionality to them manually
1. Transpiling the Ruby snippets using Opal's opal-parser.js library

The reason these are complicated are because:

1. Parsing out tokens:
   1. Parsing out tokens requires keeping track of scope
   2. Requires a small DSL to manage the tokens in between JS and Ruby
2. Transpiling snippets directly:
   1. ERB can still be nested, so some level of recursive interpretation is necessary
   2. Many of the dependent variables are implicitly available because of Rails' magic, so they are 
