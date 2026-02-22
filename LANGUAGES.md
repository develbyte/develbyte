# Supported Languages for Syntax Highlighting

This blog uses **Prism.js** for automatic syntax highlighting. Simply add `class="language-xxx"` to your code blocks.

## Currently Loaded Languages

The following languages are pre-loaded and ready to use:

### Systems Programming
- **Rust** - `language-rust`
- **C** - `language-c`
- **C++** - `language-cpp`
- **Go** - `language-go`
- **Java** - `language-java`

### Web Development
- **JavaScript** - `language-javascript`
- **TypeScript** - `language-typescript`
- **Python** - `language-python`

### Shell & DevOps
- **Bash** - `language-bash`
- **Docker** - `language-docker`

### Data Formats
- **JSON** - `language-json`
- **YAML** - `language-yaml`
- **TOML** - `language-toml`
- **SQL** - `language-sql`

### Documentation
- **Markdown** - `language-markdown`

## Usage Example

```html
<div class="code-block">
    <div class="code-header">
        <span class="code-lang">rust</span>
        <button class="code-copy" onclick="copyCode(this)">copy</button>
    </div>
    <pre><code class="language-rust">fn main() {
    println!("Hello, World!");
}</code></pre>
</div>
```

## Adding More Languages

To add support for additional languages:

1. Visit [Prism.js Supported Languages](https://prismjs.com/#supported-languages)
2. Find your language (e.g., `php`, `ruby`, `swift`, etc.)
3. Add the script tag to your HTML file before `</body>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-LANGUAGE.min.js"></script>
```

### Popular Additional Languages

If you need these, add the corresponding script:

- **PHP**: `prism-php.min.js`
- **Ruby**: `prism-ruby.min.js`
- **Swift**: `prism-swift.min.js`
- **Kotlin**: `prism-kotlin.min.js`
- **Scala**: `prism-scala.min.js`
- **Haskell**: `prism-haskell.min.js`
- **Elixir**: `prism-elixir.min.js`
- **Dart**: `prism-dart.min.js`
- **R**: `prism-r.min.js`
- **Julia**: `prism-julia.min.js`
- **Vim**: `prism-vim.min.js`
- **Nginx**: `prism-nginx.min.js`
- **GraphQL**: `prism-graphql.min.js`
- **WASM**: `prism-wasm.min.js`
- **Solidity**: `prism-solidity.min.js`

## Color Scheme

All languages use the same terminal-optimized color scheme:

| Token Type | Color | Hex Code |
|------------|-------|----------|
| Keywords | Pink | `#ff79c6` |
| Functions | Green | `#50fa7b` |
| Strings | Yellow | `#f1fa8c` |
| Numbers | Purple | `#bd93f9` |
| Comments | Gray | `#6a737d` |
| Types/Classes | Cyan | `#8be9fd` |
| Operators | Pink | `#ff79c6` |

The colors are defined in `styles.css` and can be customized by editing the `.token.*` classes.
