package lk.ijse.hello_shoes_shop_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "size")
public class StockEntity implements SuperEntity{
    @Id
    private String stockId;
    private String itemSize;
    private String qty;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "itemId")
    private ItemEntity itemEntititys;

}
