import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wishes' })
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  raised: number;

  @Column({ default: 0 })
  copied: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}
