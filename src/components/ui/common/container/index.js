
const TailwindMapper = {
  full: 'max-w-full',
  '7xl': 'max-w-7xl',
  '6xl': 'max-w-6xl',
  '5xl': 'max-w-5xl',
  '4xl': 'max-w-4xl',
  '3xl': 'max-w-3xl',
  '2xl': 'max-w-2xl',
  xl: 'max-w-xl',
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xs: 'max-w-xs',
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
  

const Container = ({ children, maxWidth = '2xl', className = '', id }) => (
  <div className={classNames(className, TailwindMapper[maxWidth], 'w-full')} id={id}>
    {children}
  </div>
)

export default Container
