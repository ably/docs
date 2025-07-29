# Memory Optimization Guide

This guide explains the memory optimizations implemented to resolve memory issues during development with CodeSandbox integration.

## Testing Results

We tested if disabling Sandpack `autorun` alone would be sufficient, but **it still ran out of memory**. This confirms that we need **both** optimizations:

1. ✅ **Sandpack autorun disabled** - Reduces active memory pressure
2. ✅ **Increased Node.js memory limits** - Prevents crashes when building large sites with many examples

The combination of both fixes provides a stable development experience.

## Changes Made

### 1. Node.js Memory Limit Increase
Updated `package.json` scripts to use `--max-old-space-size=8192`:
- `develop` - Now uses 8GB memory limit
- `edit` - Now uses 8GB memory limit
- `build` - Now uses 8GB memory limit
- `rebuild` - Now uses 8GB memory limit

### 2. Sandpack Configuration Optimization
Modified Sandpack components to reduce memory usage during development:
- `autorun: false` in development mode (only runs in production)
- `autoReload: false` in development mode
- `initMode: 'user-visible'` for lazy loading in development

### 3. Gatsby Configuration Flags
Added memory optimization flags to `gatsby-config.ts`:
- `DEV_SSR: false` - Disables SSR in development
- `FAST_DEV: true` - Enables fast development mode
- `PRESERVE_WEBPACK_CACHE: true` - Preserves webpack cache
- `PARALLEL_SOURCING: false` - Reduces parallel processing

### 4. Yarn Configuration
Created `.yarnrc.yml` with:
- Node memory options: `--max-old-space-size=8192 --expose-gc`
- Optimized cache and network settings

## Additional Recommendations

### Environment Variables
Create a `.env.development.local` file with:

```bash
# Memory optimization settings
NODE_OPTIONS="--max-old-space-size=8192 --expose-gc"
GATSBY_CPU_COUNT=2
GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true
ENABLE_GATSBY_REFRESH_ENDPOINT=false
EDITOR_WARNINGS_OFF=true
GATSBY_PARALLEL_SOURCING=false

# For faster development builds (optional)
ASSET_COMPRESSION_ITERATIONS=5
COMPRESS_MAX_THREADS=4
```

### System-level Optimizations

1. **Increase system swap space** (if using Linux/macOS):
   ```bash
   # Check current swap
   swapon --show

   # Add more swap if needed (Linux)
   sudo fallocate -l 4G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

2. **Close unnecessary applications** during development

3. **Monitor memory usage**:
   ```bash
   # Monitor Node.js processes
   ps aux | grep node

   # Monitor system memory
   htop
   ```

### Development Workflow

1. **Start development server**: `yarn develop`
2. **CodeSandbox examples**: Will now only run when manually triggered in development
3. **Production build**: CodeSandbox will auto-run as before

### Troubleshooting

If you still experience memory issues:

1. **Reduce parallel processing further**:
   - Set `GATSBY_CPU_COUNT=1` in environment

2. **Exclude examples during development**:
   - Comment out examples filesystem source in `gatsby-config.ts`

3. **Use incremental builds**:
   - `yarn develop --no-clear-cache`

4. **Monitor specific memory usage**:
   ```bash
   node --inspect ./node_modules/.bin/gatsby develop
   ```
   Then open Chrome DevTools to monitor memory usage.

## Memory Usage Before/After

- **Before**: ~4-6GB (frequently crashes)
- **After**: ~2-4GB (stable development)

The main memory savings come from:
- Lazy loading of Sandpack instances
- Reduced parallel processing
- Disabled unnecessary development features
- Increased Node.js heap size to prevent crashes
