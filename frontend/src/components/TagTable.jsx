export function getTagClass(estado) {
    switch (estado) {
      case 'activo':
        return 'is-success';
      case 'inactivo':
        return 'is-danger';
      case 'pendiente':
        return 'is-warning';
      case 'cancelado':
        return 'is-danger';
      default:
        return 'is-info';
    }
  }
  