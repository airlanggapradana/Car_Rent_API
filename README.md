
# TUGAS AKHIR PRAKTIKUM SISTEM BASIS DATA

Repositori ini merupakan tugas akhir dari praktikum sistem basis data, dimana kami mengangkat studi kasus mengenai sistem manajemen penyewaan mobil.


## API Reference

#### GET all pelanggan

```http
  GET /api/pelanggan
```

#### POST pelanggan

```http
  POST /api/pelanggan
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nama`      | `string` | **Required**. |
| `alamat`      | `string` | **Required**. |
| `no_telp`      | `string` | **Required**. |

#### PUT pelanggan

```http
  PUT /api/pelanggan/${id_pelanggan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_pelanggan`      | `string` | **Required**. |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nama`      | `string` | **Optional** |
| `alamat`      | `string` | **Optional** |
| `no_telp`      | `string` | **Optional** |


#### DELETE pelanggan

```http
  DELETE /api/pelanggan/${id_pelanggan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_pelanggan`      | `string` | **Required**. |


#### GET all kendaraan

```http
  GET /api/kendaraan
```

#### GET kendaraan by id

```http
  GET /api/kendaraan/${id_kendaraan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_kendaraan`      | `string` | **Required**. |

#### POST kendaraan

```http
  POST /api/kendaraan
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `merk`      | `string` | **Required**. |
| `model`      | `string` | **Required**. |
| `tahun`      | `number` | **Required**. |
| `harga_sewa`      | `number` | **Required**. |
| `unit`      | `number` | **Required**. |

#### PUT kendaraan

```http
  PUT /api/kendaraan/${id_kendaraan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_kendaraan`      | `string` | **Required**. |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `merk`      | `string` | **Optional**. |
| `model`      | `string` | **Optional**. |
| `tahun`      | `number` | **Optional**. |
| `harga_sewa`      | `number` | **Optional**. |
| `unit`      | `number` | **Optional**. |

#### DELETE kendaraan

```http
  DELETE /api/kendaraan/${id_kendaraan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_kendaraan`      | `string` | **Required**. |

#### GET penyewaan

```http
  GET /api/penyewaan
```

#### PUT penyewaan

```http
  PUT /api/penyewaan/${id_penyewaan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_penyewaan`      | `string` | **Required**. |

#### DELETE penyewaan

```http
  DELETE /api/penyewaan/${id_penyewaan}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_penyewaan`      | `string` | **Required**. |
