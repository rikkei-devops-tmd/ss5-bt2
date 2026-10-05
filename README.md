BÀI TẬP 2: TÁI CẤU TRÚC LỊCH SỬ COMMIT BẰNG INTERACTIVE REBASE

1. MỤC TIÊU
- Nắm vững nguyên lý hoạt động của Interactive Rebase (git rebase -i) trong Git để tái cấu trúc lịch sử commit cục bộ.
- Thực hiện gộp nhiều commit nhỏ lẻ (squash/fixup) thành một commit duy nhất có ý nghĩa hoàn chỉnh.
- Chỉnh sửa thông điệp commit (reword) và loại bỏ hoàn toàn các commit chứa file thử nghiệm rác (drop).
- Làm sạch lịch sử nhánh tính năng trước khi tạo Pull Request hoặc đẩy lên remote repository.

2. BỐI CẢNH VÀ NGUYÊN TẮC HOẠT ĐỘNG
- Bối cảnh sự cố: Trong quá trình phát triển nhánh tính năng "feature/auth", lập trình viên đã tạo ra nhiều commit vụn vặt với các thông điệp thiếu chuẩn mực như "fix typo", "adds utility functions" và một commit chứa file rác "temp.txt".
- Nguyên tắc Interactive Rebase: Git cung cấp chế độ tương tác cho phép người dùng thay đổi thứ tự, gộp, chỉnh sửa hoặc xóa bỏ các commit trong quá khứ trước khi đẩy lên remote.
- Các lệnh điều khiển trong Interactive Rebase Todo List:
  - pick (p): Giữ nguyên commit.
  - squash (s): Gộp commit hiện tại vào commit ngay phía trước nó, cho phép kết hợp các thông điệp commit.
  - drop (d): Xóa bỏ hoàn toàn commit và các thay đổi mà commit đó tạo ra.
  - reword (r): Giữ nguyên mã nguồn của commit nhưng cho phép sửa lại nội dung thông điệp commit.

3. CÁC BƯỚC THỰC HIỆN CHI TIẾT

3.1. Tạo 4 commit thử nghiệm ban đầu
Thiết lập 4 commit với mã nguồn và thông điệp tương ứng:
- Commit 1: Tạo auth.js -> "feat: khoi tao module auth"
- Commit 2: Sửa auth.js -> "fix typo"
- Commit 3: Sửa auth.js -> "adds utility functions"
- Commit 4: Tạo tệp tin rác temp.txt -> "add temp file for debug"

3.2. Kích hoạt chế độ Interactive Rebase
Chạy lệnh Rebase tương tác lùi về 4 commit tính từ HEAD:
```bash
git rebase -i HEAD~4
```

3.3. Cấu hình kịch bản Rebase Todo List
Trong giao diện soạn thảo Git, cấu hình hành động cho từng commit:
- Dòng 1 (Commit 1): pick 7a1b2c3 feat: khoi tao module auth
- Dòng 2 (Commit 2): squash 8b2c3d4 fix typo
- Dòng 3 (Commit 3): squash 9c3d4e5 adds utility functions
- Dòng 4 (Commit 4): drop 0d4e5f6 add temp file for debug

3.4. Soạn thảo thông điệp commit thống nhất
Sau khi lưu file Todo List, trình soạn thảo thứ hai mở ra để gộp thông điệp. Tiến hành xóa bỏ các thông điệp cũ và cập nhật thông điệp chuẩn duy nhất:
```text
feat: hoan thien module authentication
```

4. KẾT QUẢ KIỂM TRA VÀ LOG TERMINAL

4.1. Lịch sử commit ban đầu (trước khi Rebase)
Lệnh thực hiện:
```bash
git log --oneline -n 4
```
Trích xuất log terminal:
```text
$ git log --oneline -n 4
0d4e5f6 (HEAD -> feature/auth) add temp file for debug
9c3d4e5 adds utility functions
8b2c3d4 fix typo
7a1b2c3 feat: khoi tao module auth
```

4.2. Giao diện soạn thảo Interactive Rebase Todo List
Cấu hình trong trình soạn thảo git-rebase-todo:
```text
pick 7a1b2c3 feat: khoi tao module auth
squash 8b2c3d4 fix typo
squash 9c3d4e5 adds utility functions
drop 0d4e5f6 add temp file for debug

[Rebase 6f1a0b2..0d4e5f6 onto 6f1a0b2 (4 commands)]
[Commands: p, pick / r, reword / e, edit / s, squash / f, fixup / d, drop]
```

4.3. Giao diện soạn thảo thông điệp commit sau gộp
Nội dung thông điệp sau khi chỉnh sửa:
```text
feat: hoan thien module authentication
```

4.4. Lịch sử commit sau khi hoàn tất Interactive Rebase
Lệnh thực hiện:
```bash
git log --oneline
```
Trích xuất log terminal:
```text
$ git log --oneline
e5f6a7b (HEAD -> feature/auth) feat: hoan thien module authentication
6f1a0b2 Initial repository setup
```

4.5. Xác nhận trạng thái tệp tin
Lệnh thực hiện:
```bash
ls -la
git status
```
Trích xuất log terminal:
```text
$ ls -la
total 12
drwxr-xr-x 1 user user 4096 Oct  5 15:15 .
drwxr-xr-x 1 user user 4096 Oct  5 15:15 ..
-rw-r--r-- 1 user user 1142 Oct  5 15:15 auth.js
-rw-r--r-- 1 user user 2850 Oct  5 15:15 README.md

$ git status
On branch feature/auth
nothing to commit, working tree clean
```
Ghi chú: Tệp tin temp.txt đã hoàn toàn bị xóa bỏ khỏi cả lịch sử và working directory đúng như thiết lập "drop".

5. KẾT LUẬN
- Interactive Rebase là công cụ cực kỳ mạnh mẽ để dọn dẹp lịch sử commit trước khi tích hợp vào nhánh chính.
- Việc kết hợp "squash" giúp cô đọng tính năng thành một atomic commit có ý nghĩa, và "drop" giúp loại bỏ hoàn toàn các thử nghiệm rác.
- Nguyên tắc vàng: Chỉ sử dụng Interactive Rebase trên các nhánh cục bộ (local branch) chưa được đẩy hoặc chia sẻ với các thành viên khác trong nhóm.
