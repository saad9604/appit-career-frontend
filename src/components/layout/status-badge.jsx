export default function StatusBadge({ value }) {
    let styles = '';

    switch (value.toLowerCase()) {
        case 'active':
            styles = 'text-success border-success';
            break;
        case 'inactive':
            styles = 'text-destructive border-destructive';
            break;
        case 'weekly':
            styles = 'text-gold border-gold';
            break;
        case 'monthly':
            styles = 'text-purple border-purple';
            break;
        case 'paid':
            styles = 'text-success border-success';
            break;
        case 'pending':
            styles = 'text-gold border-gold';
            break;
        default:
            styles = 'text-primary border-primary';
    }

    return (
        <span
            className={`max-w-fit bg-transparent text-xs rounded-full border p-1 px-2 text-center capitalize ${styles}`}
        >
            {value}
        </span>
    );
}
