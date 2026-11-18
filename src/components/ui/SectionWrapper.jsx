import { cn } from '@utils/cn'

/**
 * Consistent section shell: scroll anchor, spacing, max-width container.
 * @param {string}  id               - scroll anchor id
 * @param {string}  className        - classes for the inner container
 * @param {string}  wrapperClassName - classes for the outer <section>
 */
export default function SectionWrapper({ id, children, className, wrapperClassName, style }) {
  return (
    <section id={id} className={cn('relative w-full section-padding', wrapperClassName)} style={style}>
      <div className={cn('container-site', className)}>
        {children}
      </div>
    </section>
  )
}
